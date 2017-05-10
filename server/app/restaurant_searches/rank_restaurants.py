"""
    Restaurant ranking algorithm
"""
import statistics as s
from operator import itemgetter


def calc_scores(restaurants, field):
    nums = [r[field] for r in restaurants]
    stdev = s.stdev(nums)
    mean = s.mean(nums)
    for r in restaurants:
        r[field + '_score'] = calc_score(r[field], mean, stdev)
    return restaurants


def calc_score(value, mean, stdev):
    delta = value - mean
    if delta == 0:
        return 50
    elif delta < 0:
        return -50/(delta/stdev - 1)
    else:
        return 50*(1 + delta/stdev)


def rank_restaurants(restaurants, rating_weight=0.4, review_count_weight=0.6):
    calc_scores(restaurants, 'rating')
    calc_scores(restaurants, 'review_count')
    for r in restaurants:
        r['total_score'] = r['rating_score']*rating_weight + r['review_count_score']*review_count_weight
    return sorted(restaurants, key=itemgetter('total_score'), reverse=True)
