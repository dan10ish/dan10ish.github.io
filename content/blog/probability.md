## 1. Probability Fundamentals

### 1.1 Counting Principles

#### 1.1.1 The Fundamental Counting Principle

If one event can occur in $m $ ways, and another independent event can occur in $n$ ways, then the two events can occur together in $m \times n$ ways.

Example: If you have 3 shirts and 2 pairs of pants, you have $3 \times 2 = 6$ different outfit combinations.

#### 1.1.2 Permutations

A permutation is an arrangement of objects where order matters.

Formula:

$$
P(n,r) = \frac{n!}{(n-r)!}
$$

Where $n$ is the total number of objects and $r$ is the number being arranged.

Example: How many ways can you arrange 3 books out of 5?

$$
P(5,3) = \frac{5!}{(5-3)!} = \frac{5!}{2!} = \frac{120}{2} = 60
$$

#### 1.1.3 Combinations

A combination is a selection of objects where order doesn't matter.

Formula:

$$
C(n,r) = \binom{n}{r} = \frac{n!}{r!(n-r)!}
$$

Example: In how many ways can you select 3 books out of 5?

$$
C(5,3) = \binom{5}{3} = \frac{5!}{3!(5-3)!} = \frac{5!}{3!2!} = \frac{120}{12} = 10
$$

### 1.2 Probability Axioms

#### 1.2.1 Axiom 1: Non-negativity

For any event $A$, $P(A) \geq 0$

#### 1.2.2 Axiom 2: Probability of the entire sample space

$P(S) = 1$, where $S$ is the sample space

#### 1.2.3 Axiom 3: Additivity

For mutually exclusive events $A$ and $B$, $P(A \cup B) = P(A) + P(B)$

### 1.3 Basic Probability Concepts

#### 1.3.1 Sample Space

The set of all possible outcomes of an experiment.

Example: When rolling a die, $S = \{1, 2, 3, 4, 5, 6\}$

#### 1.3.2 Events

An event is a subset of the sample space.

Example: The event of rolling an even number: $E = \{2, 4, 6\}$

#### 1.3.3 Probability of an Event

$$
P(A) = \frac{\text{Number of favorable outcomes}}{\text{Total number of possible outcomes}}
$$

Example: $P(\text{rolling an even number}) = \frac{3}{6} = \frac{1}{2}$

#### 1.3.4 Conditional Probability

The probability of an event $A$, given that event $B$ has occurred.

Formula:

$$
P(A|B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0
$$

Example: In a deck of 52 cards, what's the probability of drawing a king, given that it's a face card?

$$
P(\text{King | Face Card}) = \frac{P(\text{King} \cap \text{Face Card})}{P(\text{Face Card})} = \frac{4/52}{12/52} = \frac{1}{3}
$$

#### 1.3.5 Independent Events

Events $A$ and $B$ are independent if $P(A \cap B) = P(A) \times P(B)$

Example: The probability of getting heads on two coin flips:

$$
P(H \cap H) = P(H) \times P(H) = \frac{1}{2} \times \frac{1}{2} = \frac{1}{4}
$$

#### 1.3.6 Mutually Exclusive Events

Events that cannot occur simultaneously. If $A$ and $B$ are mutually exclusive, $P(A \cap B) = 0$

Example: Rolling an even number and an odd number on a single die roll.

### 1.4 Additional Important Concepts

#### 1.4.1 Bayes' Theorem

$$
P(A|B) = \frac{P(B|A)P(A)}{P(B)} = \frac{P(B|A)P(A)}{P(B|A)P(A) + P(B|A^c)P(A^c)}
$$

This theorem is crucial for updating probabilities based on new evidence.

#### 1.4.2 Law of Total Probability

For mutually exclusive and exhaustive events $B_1, B_2, ..., B_n$:

$$
P(A) = \sum_{i=1}^n P(A|B_i)P(B_i)
$$

This law is useful for calculating probabilities when multiple scenarios are possible.

## 2. Random Variables and Probability Distributions

### 2.1 Random Variables

A random variable is a variable whose possible values are outcomes of a random phenomenon.

#### 2.1.1 Discrete Random Variables

Can only take on a countable number of distinct values.

Example: Number of heads in 3 coin flips (possible values: 0, 1, 2, 3)

#### 2.1.2 Continuous Random Variables

Can take on any value within a given range.

Example: Height of a person (can be any real number within a realistic range)

### 2.2 Probability Mass Function (PMF)

For a discrete random variable $X$, the PMF gives the probability that $X$ is exactly equal to some value $x$.

Properties:

1. $0 \leq P(X = x) \leq 1$
2. $\sum_x P(X = x) = 1$ (sum over all possible $x$)

### 2.3 Probability Density Function (PDF)

For a continuous random variable $X$, the PDF $f(x)$ is used such that the probability of $X$ falling in an interval $[a, b]$ is given by the integral of $f(x)$ from $a$ to $b$.

Properties:

1. $f(x) \geq 0$ for all $x$
2. $\int_{-\infty}^{\infty} f(x)dx = 1$

### 2.4 Cumulative Distribution Function (CDF)

The CDF $F(x)$ gives the probability that $X$ takes on a value less than or equal to $x$.

For discrete $X$: $F(x) = P(X \leq x) = \sum_{t \leq x} P(X = t)$
For continuous $X$: $F(x) = P(X \leq x) = \int_{-\infty}^x f(t)dt$

### 2.5 Expected Value and Variance

#### 2.5.1 Expected Value (Mean)

For discrete $X$: $E(X) = \sum_x x P(X = x)$
For continuous $X$: $E(X) = \int_{-\infty}^{\infty} x f(x)dx$

#### 2.5.2 Variance and Standard Deviation

Variance: $Var(X) = E[(X - E(X))^2] = E(X^2) - [E(X)]^2$
Standard Deviation: $\sigma = \sqrt{Var(X)}$

### 2.6 Common Discrete Distributions

#### 2.6.1 Bernoulli Distribution

Models a single trial with two possible outcomes (success/failure).

- PMF: $P(X = 1) = p$, $P(X = 0) = 1-p$
- Mean: $E(X) = p$
- Variance: $Var(X) = p(1-p)$

#### 2.6.2 Binomial Distribution

Models the number of successes in $n$ independent Bernoulli trials.

- PMF: $P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$
- Mean: $E(X) = np$
- Variance: $Var(X) = np(1-p)$

#### 2.6.3 Poisson Distribution

Models the number of events occurring in a fixed interval of time or space.

- PMF: $P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}$
- Mean: $E(X) = \lambda$
- Variance: $Var(X) = \lambda$

### 2.7 Common Continuous Distributions

#### 2.7.1 Uniform Distribution

All intervals of the same length on the distribution's support are equally probable.

- PDF: $f(x) = \frac{1}{b-a}$ for $a \leq x \leq b$
- Mean: $E(X) = \frac{a+b}{2}$
- Variance: $Var(X) = \frac{(b-a)^2}{12}$

#### 2.7.2 Normal (Gaussian) Distribution

Bell-shaped distribution defined by its mean $\mu$ and standard deviation $\sigma$.

- PDF:
  $$
  f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}
  $$
- Mean: $E(X) = \mu$
- Variance: $Var(X) = \sigma^2$

#### 2.7.3 Exponential Distribution

Models the time between events in a Poisson process.

- PDF: $f(x) = \lambda e^{-\lambda x}$ for $x \geq 0$
- Mean: $E(X) = \frac{1}{\lambda}$
- Variance: $Var(X) = \frac{1}{\lambda^2}$

## 3. Joint Probability Distributions, Covariance, and Correlation

### 3.1 Joint Probability Distributions

#### 3.1.1 Joint Probability Mass Function (Joint PMF)

For discrete random variables $X$ and $Y$:

$$
P(X = x, Y = y) = P(X = x \text{ and } Y = y)
$$

Properties:

1. $P(x, y) \geq 0$ for all $x$ and $y$
2. $\sum_x \sum_y P(x, y) = 1$ (sum over all possible $x$ and $y$)

#### 3.1.2 Joint Probability Density Function (Joint PDF)

For continuous random variables $X$ and $Y$, the joint PDF $f(x, y)$ is used such that:

$$
P(a \leq X \leq b, c \leq Y \leq d) = \int_a^b \int_c^d f(x, y) \, dy \, dx
$$

Properties:

1. $f(x, y) \geq 0$ for all $x$ and $y$
2. $\int_{-\infty}^{\infty} \int_{-\infty}^{\infty} f(x, y) \, dx \, dy = 1$

### 3.2 Marginal Distributions

#### 3.2.1 Marginal PMF

For discrete variables:

$$
P(X = x) = \sum_y P(X = x, Y = y)
$$

#### 3.2.2 Marginal PDF

For continuous variables:

$$
f_X(x) = \int_{-\infty}^{\infty} f(x, y) \, dy
$$

### 3.3 Conditional Distributions

#### 3.3.1 Conditional PMF

For discrete variables:

$$
P(Y = y | X = x) = \frac{P(X = x, Y = y)}{P(X = x)}
$$

#### 3.3.2 Conditional PDF

For continuous variables:

$$
f_{Y|X}(y|x) = \frac{f(x, y)}{f_X(x)}
$$

### 3.4 Independence of Random Variables

Random variables $X$ and $Y$ are independent if:

$$
P(X = x, Y = y) = P(X = x) \times P(Y = y)
$$

for all $x$ and $y$

For continuous variables:

$$
f(x, y) = f_X(x) \times f_Y(y)
$$

for all $x$ and $y$

### 3.5 Covariance

Covariance measures the joint variability of two random variables.

$$
Cov(X, Y) = E[(X - E[X])(Y - E[Y])] = E[XY] - E[X]E[Y]
$$

Properties:

1. $Cov(X, X) = Var(X)$
2. $Cov(X, Y) = Cov(Y, X)$
3. $Cov(aX, bY) = ab \times Cov(X, Y)$

### 3.6 Correlation

Correlation is a normalized measure of the linear relationship between two variables.

Correlation coefficient:

$$
\rho = \frac{Cov(X, Y)}{\sigma_X \sigma_Y}
$$

Properties:

1. $-1 \leq \rho \leq 1$
2. $\rho = 1$ or $-1$ indicates perfect linear relationship
3. $\rho = 0$ indicates no linear relationship (but doesn't rule out other types of relationships)

## 4. Limit Theorems and Sampling Distributions

### 4.1 Law of Large Numbers (LLN)

#### 4.1.1 Weak Law of Large Numbers

For a sequence of i.i.d. random variables $X_1, X_2, ..., X_n$ with $E[X_i] = \mu$,

$$
P(|\bar{X}_n - \mu| > \varepsilon) \to 0 \text{ as } n \to \infty, \text{ for any } \varepsilon > 0
$$

Where $\bar{X}_n$ is the sample mean of $n$ observations.

#### 4.1.2 Strong Law of Large Numbers

$$
P(\lim_{n \to \infty} \bar{X}_n = \mu) = 1
$$

The strong law implies that the sample mean almost surely converges to the expected value.

### 4.2 Central Limit Theorem (CLT)

If $X_1, X_2, ..., X_n$ are i.i.d. random variables with $E[X_i] = \mu$ and $Var(X_i) = \sigma^2$, then:

$$
\frac{\bar{X}_n - \mu}{\sigma/\sqrt{n}} \xrightarrow{d} N(0,1) \text{ as } n \to \infty
$$

Where $\bar{X}_n$ is the sample mean, and $N(0,1)$ is the standard normal distribution.

### 4.3 Sampling Distributions

#### 4.3.1 Sampling Distribution of the Mean

For a population with mean $\mu$ and standard deviation $\sigma$:

1. $E(\bar{X}) = \mu$
2. $\sigma_{\bar{X}} = \frac{\sigma}{\sqrt{n}}$, where $n$ is the sample size
3. If the population is normally distributed, $\bar{X} \sim N(\mu, \frac{\sigma^2}{n})$ for any sample size
4. If the population is not normal but $n$ is large (typically $n \geq 30$), $\bar{X}$ is approximately normal by CLT

#### 4.3.2 Sampling Distribution of the Proportion

For a population proportion $p$:

1. $E(\hat{p}) = p$
2. $\sigma_{\hat{p}} = \sqrt{\frac{p(1-p)}{n}}$, where $n$ is the sample size
3. For large $n$, $\hat{p}$ is approximately normal with $\mu = p$ and $\sigma = \sqrt{\frac{p(1-p)}{n}}$

### 4.4 Student's t-Distribution

When the population standard deviation is unknown and estimated from the sample, we use the t-distribution instead of the normal distribution.

The t-distribution has heavier tails than the normal distribution and approaches the normal distribution as degrees of freedom increase.

Degrees of freedom = $n - 1$, where $n$ is the sample size.

### 4.5 Chi-Square Distribution

The chi-square distribution is used in hypothesis testing and constructing confidence intervals for population variance.

If $Z_1, Z_2, ..., Z_k$ are independent standard normal random variables, then the sum of their squares follows a chi-square distribution with $k$ degrees of freedom:

$$
\sum_{i=1}^k Z_i^2 \sim \chi^2_k
$$

## 5. Hypothesis Testing and Confidence Intervals

### 5.1 Hypothesis Testing

Hypothesis testing is a method of statistical inference used to decide whether there is enough evidence in a sample of data to infer that a certain condition is true for the entire population.

#### 5.1.1 Steps in Hypothesis Testing

1. State the null ($H_0$) and alternative ($H_1$) hypotheses
2. Choose the significance level ($\alpha$)
3. Calculate the test statistic
4. Determine the critical value or p-value
5. Make a decision to reject or fail to reject $H_0$

#### 5.1.2 Types of Errors

- Type I Error: Rejecting $H_0$ when it's true (probability = $\alpha$)
- Type II Error: Failing to reject $H_0$ when it's false (probability = $\beta$)
- Power of the test = $1 - \beta$

### 5.2 Z-Test

Used when the population standard deviation is known and the sample size is large ($n \geq 30$).

#### 5.2.1 One-Sample Z-Test

Test statistic:

$$
Z = \frac{\bar{X} - \mu_0}{\sigma / \sqrt{n}}
$$

Where $\mu_0$ is the hypothesized population mean

#### 5.2.2 Two-Sample Z-Test

Test statistic:

$$
Z = \frac{(\bar{X}_1 - \bar{X}_2) - (\mu_1 - \mu_2)}{\sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}}
$$

### 5.3 T-Test

Used when the population standard deviation is unknown and/or the sample size is small ($n < 30$).

#### 5.3.1 One-Sample T-Test

Test statistic:

$$
t = \frac{\bar{X} - \mu_0}{s / \sqrt{n}}
$$

Where $s$ is the sample standard deviation

#### 5.3.2 Two-Sample T-Test

For equal variances:

$$
t = \frac{(\bar{X}_1 - \bar{X}_2) - (\mu_1 - \mu_2)}{s_p \sqrt{\frac{1}{n_1} + \frac{1}{n_2}}}
$$

Where $s_p$ is the pooled standard deviation

For unequal variances (Welch's t-test):

$$
t = \frac{(\bar{X}_1 - \bar{X}_2) - (\mu_1 - \mu_2)}{\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}}
$$

### 5.4 Chi-Square Test

Used for categorical data to test goodness of fit or independence.

#### 5.4.1 Goodness of Fit Test

Test statistic:

$$
\chi^2 = \sum_{i=1}^k \frac{(O_i - E_i)^2}{E_i}
$$

Where $O_i$ is the observed frequency and $E_i$ is the expected frequency

#### 5.4.2 Test of Independence

Test statistic:

$$
\chi^2 = \sum_{i=1}^r \sum_{j=1}^c \frac{(O_{ij} - E_{ij})^2}{E_{ij}}
$$

Where $O_{ij}$ and $E_{ij}$ are the observed and expected frequencies in cell $(i,j)$

### 5.5 Confidence Intervals

A confidence interval provides a range of values that is likely to contain the population parameter with a certain level of confidence.

#### 5.5.1 Confidence Interval for Mean (known $\sigma$)

$$
\text{CI}: \bar{X} \pm z_{\alpha/2} \frac{\sigma}{\sqrt{n}}
$$

#### 5.5.2 Confidence Interval for Mean (unknown $\sigma$)

$$
\text{CI}: \bar{X} \pm t_{\alpha/2} \frac{s}{\sqrt{n}}
$$

#### 5.5.3 Confidence Interval for Proportion

$$
\text{CI}: \hat{p} \pm z_{\alpha/2} \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}
$$
