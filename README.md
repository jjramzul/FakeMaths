# FakeMaths - Simulación Matemática de Propagación de Fake News

## Descripción

FakeMaths es una aplicación interactiva desarrollada para modelar matemáticamente la propagación de fake news utilizando el modelo epidemiológico SIR adaptado a redes sociales.

El proyecto combina implementación matemática en Python con una interfaz interactiva desarrollada en JavaScript, permitiendo visualizar cómo una noticia falsa se propaga, comparar distintos métodos numéricos y analizar errores computacionales entre aproximaciones.

La aplicación combina simulación matemática, visualización interactiva y una interfaz inspirada en redes sociales para facilitar la interpretación de los resultados.

---

# Objetivos del Proyecto

- Modelar la propagación de fake news usando ecuaciones diferenciales
- Implementar distintos métodos numéricos para resolver el sistema SIR
- Comparar precisión y errores entre métodos
- Visualizar dinámicas de propagación de forma interactiva
- Analizar comportamiento computacional de distintos algoritmos
- Construir una representación visual que facilite la interpretación matemática

---

# Modelo Matemático

Se utilizó el modelo SIR adaptado:

- **S(t)** → Personas susceptibles a ver la noticia
- **I(t)** → Personas compartiendo la noticia
- **R(t)** → Personas que dejaron de compartir

Variables principales:

- β (beta): velocidad de propagación
- γ (gamma): velocidad de recuperación
- h: tamaño del paso numérico
- tf: tiempo final de simulación

---

# Métodos Numéricos Implementados

## Euler

Método explícito de primer orden utilizado como aproximación básica.

## Euler Mejorado

Versión corregida del método de Euler utilizando predicción-corrección.

## Runge Kutta 4 (RK4)

Método numérico de cuarto orden utilizado para obtener aproximaciones más precisas.

## Solver de Referencia

Se implementó un solver basado en RK4 utilizando pasos extremadamente pequeños para generar valores de referencia y calcular errores.

---

# Arquitectura General

El proyecto fue dividido en dos componentes:

## Parte Matemática (Python)

Responsable de:

- Implementación del modelo SIR
- Métodos numéricos
- Validación matemática
- Comparación de errores
- Solver de referencia

## Parte Visual / Interactiva (Frontend)

Responsable de:

- Visualización interactiva
- Simulación estilo red social
- Estadísticas automáticas
- Resultados comparativos
- Gráficas dinámicas

---

# Estructura del Proyecto

```text
project/

├── python/

│   ├── main.py
│   ├── solver.py
│   ├── euler.py
│   ├── euler_mejorado.py
│   ├── rk4.py
│   └── sir_model.py


├── frontend/

│   ├── app.js
│   ├── index.html
│   ├── style.css

│   ├── methods/

│   │   ├── euler.js
│   │   ├── eulerMejorado.js
│   │   ├── rk4.js
│   │   └── solver.js

│   └── model/

│       └── sir.js
```

---

# Tecnologías Utilizadas

## Backend Matemático

- Python
- NumPy
- Matplotlib

## Frontend

- HTML
- CSS
- JavaScript
- Chart.js

---

# Funcionalidades

- Simulación de fake news personalizadas
- Comparación entre múltiples métodos numéricos
- Visualización gráfica de propagación
- Cálculo de errores absolutos y relativos
- Estadísticas automáticas
- Visualización inspirada en redes sociales
- Ejecución individual o simultánea de métodos
- Comparación matemática entre aproximaciones

---

# Flujo General

```text
Modelo SIR

↓

Métodos Numéricos

↓

Resultados Matemáticos

↓

Frontend Interactivo

↓

Visualización y Comparación
```

---

# Uso

## Parte Matemática (Python)

Ejecutar:

```bash
python main.py
```

Esto permite:

- Ejecutar simulaciones
- Validar métodos
- Obtener referencias matemáticas
- Analizar errores

---

## Parte Visual

Abrir:

```text
frontend/index.html
```

Configurar:

```text
Beta

Gamma

S0

I0

R0

h

Tiempo final
```

Seleccionar:

```text
Euler

Euler Mejorado

RK4

Todos
```

Ejecutar simulación.

---

# Uso de Inteligencia Artificial

La construcción del proyecto incluyó apoyo de herramientas de Inteligencia Artificial como asistencia durante:

- Investigación conceptual y técnica
- Explicaciones matemáticas
- Validación de ideas
- Arquitectura general
- Resolución de dudas técnicas
- Construcción del frontend demostrativo
- Apoyo durante etapas de debugging y corrección

El desarrollo, adaptación, validación matemática, pruebas, correcciones y toma de decisiones finales fueron realizadas manualmente.

---

# Autores

```text
Juan José Ramírez Zuluaga
```

---

# Nota Final

Este proyecto busca demostrar cómo herramientas matemáticas clásicas pueden aplicarse a fenómenos digitales modernos, mostrando que la propagación de información puede estudiarse utilizando técnicas similares a las empleadas en epidemiología.

FakeMaths intenta transformar ecuaciones diferenciales y métodos numéricos en una experiencia visual e interactiva, porque observar gráficos crecer lentamente suele ser menos doloroso que leer únicamente matrices y ecuaciones.
