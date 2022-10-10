---
categories:
  - Algorithm
  - LeetCode
date: '2020-11-28'
description: leet code 알고리즘 문제 풀이
tags:
  - algorithm
  - leetcode 
title: Partition Equal Subset Sum
---

# [LeetCode] Partition Equal Subset Sum

## 문제
Given a non-empty array nums containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

정수만이 포함된 비어있지 않은 배열이 주어진다. 주어진 배열을 두개의 subset 으로 나누었을 때 두 배열의 합이 같아지는 경우가 있는지 찾는다.

Example 1:

Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].

Example 2:

Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.

Constraints:

`1 <= nums.length <= 200`

`1 <= nums[i] <= 100`

## 풀이
이러한 문제의 경우 비효율적이라고 생각될지는 몰라도 일단 모든 경우의 수를 찾아 비교해보는 방식으로 접근해보는게 빠를 때가 있다.

주어진 배열의 모든 정수의 합을 total,
subset 의 모든 정수의 합을 a 라고 했을 때
a + a = 2a = total 이므로
a * 2 = total 이 되는 subset 을 찾으면 된다.

주어진 배열의 모든 subset 을 찾아 조건이 맞는지 확인해보자.

```typescript
function canPartition(nums: number[]) {
    // 정수 배열의 모든 합
    const total = nums.reduce((prev, curr) => prev + curr);

    // 합을 2로 나누었을 때 짝수가 아니면 답이 나올수가 없다.
    if (total % 2 !== 0) {
        return false
    }

    // 모든 경우의수를 구하고자 할 때는 재귀함수를 생각해보자
    const recurse = (index: number, sum: number): boolean => {
    	// subset 의 합 * 2 === total 이면 원하는 정답. (a + a = 2a)
        if (sum * 2 === total) {
            return true;
        }

	// 아래 조건의 subset 일 경우 false 반환
        if (sum * 2 > total || index > nums.length - 1) {
            return false;
        }
        
        // 모든 subset 합의 경우의 수를 재귀한다
        return recurse(index + 1, sum) || recurse(index + 1, sum + nums[index]);

    };

    return recurse(0, 0);
}
```
하지만 위 코드를 실제 leetcode 에서 실행 시킬경우 Time Limit Exceeded 가 뜨며 실행시간이 초과됐으므로 제출 할 수 없다.

이유는 모든 subset 을 재귀하여 경우의 수를 구하기 때문에 어마어마한 시간이 들어간다.

## Dynamic Programming
이를 해결하기 위해 DP 를 적용해보자

```typescript
function canPartition(nums: number[]) {
    const total = nums.reduce((prev, curr) => prev + curr);

    if (total % 2 !== 0) {
        return false
    }
    
    const memo = new Map<string, boolean>();

    const recurse = (index: number, sum: number): boolean => {
        const key = index.toString() + sum.toString();

        if (memo.has(key)) {
            const val = memo.get(key);
            return val ? val : false;
        }

        if (sum * 2 === total) {
            return true;
        }

        if (sum * 2 > total  || index >= nums.length) {
            return false;
        }

        const foundPartition = recurse(index + 1, sum) || recurse(index + 1, sum + nums[index]);
        memo.set(key, foundPartition);
        return foundPartition;
    };
    
    return recurse(0, 0);
}
```

한번 풀었던 답은 memo 에 저장하고, 이미 풀었던 답은 memo 에서 찾아오는 방식으로 실행시간을 대폭 줄일 수 있다.

