---
title: Math Typesetting
description: Write LaTeX in Markdown and get crisp, accessible formulas rendered at build time with KaTeX.
date: 2026-08-30
category: Reference
tags: [Math, KaTeX, Markdown]
---

Sumi renders LaTeX with [KaTeX](https://katex.org) during the build. Formulas are plain
HTML and CSS in the finished page — nothing is computed in the reader's browser.

## Inline math

Wrap an expression in single dollar signs: the area of a circle is $A = \pi r^2$, and
Euler's identity is $e^{i\pi} + 1 = 0$.

## Display math

Use double dollar signs on their own lines for a centred block:

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$

$$
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x - a)^n
$$

## Matrices

$$
\mathbf{A} =
\begin{pmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22}
\end{pmatrix},
\qquad
\det \mathbf{A} = a_{11}a_{22} - a_{12}a_{21}
$$

## Aligned equations

$$
\begin{aligned}
(a + b)^2 &= (a + b)(a + b) \\
          &= a^2 + 2ab + b^2
\end{aligned}
$$

## Writing a literal dollar sign

Escape it with a backslash: the plugin costs \$0.
