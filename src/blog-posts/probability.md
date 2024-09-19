# Chapter 1 : Combinatorial Analysis

Mathematical theory of counting is formally know as _combinatorial analysis_.

## The Basic Principle of Counting

> If one experiment has `m` outcomes and another experiment has `n` outcomes, then the total possible outcomes of the two experiments are `mn`

**Q.** In a 7-place license plate , first three places can be non repeated letters and other four places can be non repeated numbers. What are the total possible combinations of license plates.

**A.** `26 x 25 x 24 x 10 x 9 x 8 x 7` = `78624000` possible license plates

---

## Permutations

> Number of possible arrangements for a specific set of elements

- `n!` = `n x (n-1) x (n-2) x .... (n-n)`
  $$
  ^nP_r = \frac{n!}{(n-r)!}
  $$
  n = `total number of objects`
  r = `number of objects selected`

**Q.** Total number of letter arrangements from `PEPPER`?

**A.** n = 6. Here, `P` repeats 3 times and `E` repeats 2 times. So, total number of permutations can be given by

$$
\frac{6!}{(3!)(2!)} = 60
$$

---

## Combinations

> A mathematical technique that determines the number of possible arrangements in a collection of items where the order of the selection does **not** matter

$$
^nC_r = \frac{n!}{(n-r)!r!}
$$

**Q.** no. of women = 5, no. of men = 7. How many different committees of two women and three men can be formed? What if two men are feuding and refused to serve on the same committee together?

**A.** For no restriction:-
$(^5C_2) (^7C_3) = 350$ possible outcomes
With restrictions:-
Find no. of committees where the two feuding men are together:-
$^5C_1$ , because 1 more man from remaining 5 men
No. of women choices remain same : $^5C_2$
So, $(^5C_1) (^5C_) = 50$
So total outcome with restrictions = `350` - `50` = `300`

---

## Binomial Theorem

> Method of expanding expression raised to finite power

$$
(x+y)^n = \sum_{k=0}^n {^nC_kx^ky^{n-k}}
$$

---

This note is yet to be completed 🚧...
