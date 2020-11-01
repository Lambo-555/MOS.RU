dict_users, dict_movies = dict(),dict()
list_users, list_movies = [], []
n = 3

import pandas as pd
import pickle
from sklearn.decomposition import TruncatedSVD
from implicit.als import AlternatingLeastSquares
from implicit.bpr import BayesianPersonalizedRanking
from implicit.lmf import LogisticMatrixFactorization
from smart_open import smart_open
from implicit.approximate_als import AnnoyAlternatingLeastSquares, NMSLibAlternatingLeastSquares
from scipy.sparse import coo_matrix
import nmslib
import itertools


def books_recomendation(id, age, is_KD):
    pass




def hobby_recommendation(id, age, is_KD):
    if is_KD:
        return get_recs(id)

    else:
        return get_hobby_age(age)




def event_recommendation(id, age, is_KD):
    return get_recs_event(age=[age])




def converting_new_ids(data, n_x, n_y):
    dict_users, dict_movies = dict.fromkeys(sorted(data['pupil_id'].unique())), dict.fromkeys(
        sorted(data['full_name'].unique()))

    for i, key in zip(range(n_x), dict_users.keys()):
        dict_users[key] = i
        list_users.append(key)

    for i, key in zip(range(n_y), dict_movies.keys()):
        dict_movies[key] = i
        list_movies.append(key)

    data['pupil_id'] = data['pupil_id'].apply(lambda x: dict_users[x])
    data['full_name'] = data['full_name'].apply(lambda x: dict_movies[x])

    return data




def train():
    # url = 's3://sagemaker-studio-0mmkxri6hgom/'
    # data = pd.read_csv(smart_open(url+'data.csv'),',', index_col=0)
    data = pd.read_csv('data.csv', ',', index_col=0)
    data['score'] = 1
    data = data.groupby(by=['pupil_id', 'full_name']).sum().reset_index()

    x, y = len(data['pupil_id'].unique()), len(data['full_name'].unique())
    data = converting_new_ids(data.copy(), x, y)
    coo_mx = coo_matrix((data['score'], (data['pupil_id'], data['full_name'])), shape=(x, y))

    models = [AlternatingLeastSquares(factors=30, use_gpu=False),
              BayesianPersonalizedRanking(factors=30, use_gpu=False),
              LogisticMatrixFactorization(factors=30, use_gpu=False)]
    # Training
    for model, i in zip(models, range(len(models))):
        model.fit(coo_mx.T)
        with open('model' + str(i) + '.h5', 'w+b') as f:
            pickle.dump(model, f)

# Функция рекомендации кружков по коллаборативной фильтрации

def get_recs(ix):
    # url = 's3://sagemaker-studio-0mmkxri6hgom/'
    # data = pd.read_csv(smart_open(url+'data.csv'),',', index_col=0)
    data = pd.read_csv('data.csv', ',', index_col=0)
    data['score'] = 1
    data = data.groupby(by=['pupil_id', 'full_name']).sum().reset_index()

    x, y = len(data['pupil_id'].unique()), len(data['full_name'].unique())
    data = converting_new_ids(data.copy(), x, y)
    coo_mx = coo_matrix((data['score'], (data['pupil_id'], data['full_name'])), shape=(x, y))

    models = []
    # Training
    for i in range(n):
        with open('model' + str(i) + '.h5', 'rb') as f:
            models.append(pickle.load(f))

    dict_preds, preds = dict(), []

    for i in data['full_name'].unique(): dict_preds[i] = 0

    for model in models:
        model_ranks = model.rank_items(i, coo_mx.tocsr(), data['full_name'].unique())
        for item in model_ranks:
            dict_preds[item[0]] += item[1]

    names = []
    sort_elements = sorted(dict_preds.items(), key=lambda x: x[1], reverse=True)

    for el in sort_elements:
        names.append(list_movies[el[0]])

    return names

# Функция рекомендации событий
def get_recs(age, status=[], fields=0, free=0, ovz=0, online=0):
    data = pd.read_csv('event_data.csv', index_col=0)
    cur_data = data[data['Статус']==status].sort_values(by='Дата начала мероприятия')

    if age >= 1 and age < 12:
        cur_data = cur_data[cur_data['Целевая дети дошкольного возраста']==1]
    elif age >= 12 and age < 18:
        cur_data = cur_data[cur_data['Целевая школьники']==1]
    elif age >= 18 and age < 21:
        cur_data = cur_data[cur_data['Целевая студенческая молодежь']==1]
    elif age >= 21 and age < 30:
        cur_data = cur_data[cur_data['Целевая работающая молодежь']==1]
    elif age >= 31 and age < 50:
        cur_data = cur_data[cur_data['Целевая взрослые']==1]
    elif age >= 50 and age < 100:
        cur_data = cur_data[cur_data['Целевая пенсионеры']==1]
    else:
        cur_data = cur_data[cur_data['Целевая Для всех']==1]

    if len(fields) > 0:
        for field in fields:
            cur_data = cur_data[cur_data['Направленность '+field]==1]

    cur_data = cur_data[cur_data['Доступность мероприятия для лиц с ОВЗ']==ovz]
    cur_data = cur_data[cur_data['Платное']==free]
    cur_data = cur_data[cur_data['Онлайн']==online]

    return cur_data.to_json()

# Функция рекомендации кружка по интересам
def get_knn_recomend(idn):
    df = pd.read_csv('knn_data.csv', index_col=0)
    with open('knn_model.pkl', 'rb') as file:
        model = pickle.load(file)
    res = model.radius_neighbors([df.loc[idn]], radius = 1e-16)[1][0][-1:-3:-1]
    return df.iloc[res][['service_id', 'org_id']]


# Функция рекомендации кружка по возрасту
def get_hobby_age(age):
    age = int(float(age))
    s = 10
    i = 0
    df = pd.read_csv('KD.csv', index_col=0)
    while (df.age == age + i).sum() > s:
        s -= (df.age == age + i).sum()
        i += 1
        return df[df.age.isin(range(age, age+i+1))][['full_name', 'service_name']].iloc[:20].to_json()


print(hobby_recommendation('1253177', '10.0', False));