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

---

# Chapter 2 : Axioms of Probability

## Sample Space and Events

**Sample Space :** set of all possible outcomes of an experiment. Denoted by `S`.  
**Union :** $A\cup B$ = all elements either in A or in B  
**Intersection :** $A\cap B$ = common elements between A and B  
**Subset :** $A\subset B$ = every outcome of A is also an outcome of B  
**Superset :** $A \supset B$ = A contains all outcomes of B

### Rules

1. Commutative Laws :- $A\cup B = B\cup A$
2. Associative Laws :- $(A\cup B) \cup C = A\cup (B \cup C)$
3. Distributive Laws :- $(A\cup B)C = AC \cup BC$
4. DeMorgan's Laws :-
   1. $\neg(A\cup B) = \neg A \cap \neg B$
   2. $\neg(A\cap B) = \neg A \cup \neg B$

---

## Axioms of Probability

1. Non-negativity  
   _Probability of any event is always non zero._  
   $P(A) \geq 0$

2. Normalization  
   _Probability of entire sample space is 1._  
   $P(S) = 1$

3. Additivity  
   _If two events `A` and `B` are mutually exclusive, the probability of their union is the sum of their individual probabilities_  
   $P(A\cup B) = P(A) + P(B)$ where $A\cap B = \emptyset$

**Ex.** A biased coin tossed, where a head is twice as likely to appear as a tail, then we would have, $P(\{H\}) = \frac{2}{3}$ and $P(\{T\}) = \frac{1}{3}$

---

## Simple Propositions

1. Complement Rule  
   $P(\neg A) = 1 - P(A)$

2. Addition Rule  
   $P(A \cup B) = P(A) + P(B) - P(A \cap B)$

3. Multiplication Rule  
   $P(A\cap B) = P(A) * P(B)$

4. Conditional Probability  
   _Probability of event `A` given that event `B` has occurred is_  
   $P(\frac{A}{B}) = \frac{P(A\cap B)}{P(B)}$ if $P(B) > 0$

---

This note is yet to be completed 🚧
