#Modelo de Fake News usando el modelo SIR (Susceptible, Infectado, Recuperado), con metodo de Euler, Euler Mejorado y rk4
# (inicial para luego usar API para simulacion)

import numpy as np
import matplotlib.pyplot as plt
from euler import euler
from euler_mejorado import euler_mejorado
from rk4 import rk4
from solver import solver

#Funciones de derivada

#T Cambio de susceptibles 
def dS_dt(S, I, beta):
    return -beta * S * I

#T cambio de infectados
def dI_dt(S, I, beta, gamma):
    return beta * S * I - gamma * I

#T Cambio de recuperados
def dR_dt(I, gamma):
    return gamma * I


def main():

    #Params
    beta = 0.0003      # Tasa de propagación
    gamma = 0.1     # Tasa de abandono

    #Iniciales
    S0 = 990        # Susceptibles inicial
    I0 = 10         # Compartiendo inicial
    R0 = 0          # Recuperados inicial (Los q dejan de compartir)

    # Tiempo d simulacion
    t0 = 0          # Tiempo inicial
    tf = 100        # Tiempo final

    h = 1         # Tamaño de paso

    # Cantidad de pasos (n) para el tiempo de simulación
    n = int((tf - t0) / h)
    print(f"Cantidad de pasos: {n} \n")

    # Vector de tiempo
    t = np.linspace(t0, tf, n)
    #Crea un vector para cada paso de t, los parte desde t0 hasta tf, con n puntos igualmente espaciados (Numpy hace eso solo)

    #Ejecutar Euler
    S, I, R = euler( S0, I0, R0, h, n, beta, gamma, dS_dt, dI_dt, dR_dt )

    #Ejecutar Euler Mejorado
    S_mej, I_mej, R_mej = euler_mejorado(S0, I0, R0, h, n, beta, gamma, dS_dt, dI_dt, dR_dt)

    #Ejecutar RK4
    S_rk4, I_rk4, R_rk4 = rk4(S0, I0, R0, h, n, beta, gamma, dS_dt, dI_dt, dR_dt)

    #Ejecutar solver de referencia
    S_ref, I_ref, R_ref = solver(S0, I0, R0, t0, tf, t, beta, gamma)

    #apoyado en IA para el análisis de resultados y comparación de métodos


    # VALORES FINALES MÉTODOS

    print("\n===== VALORES FINALES =====")

    print("\nEuler")
    print(f"S final: {S[-1]}")
    print(f"I final: {I[-1]}")
    print(f"R final: {R[-1]}")

    print("\nEuler Mejorado")
    print(f"S final: {S_mej[-1]}")
    print(f"I final: {I_mej[-1]}")
    print(f"R final: {R_mej[-1]}")

    print("\nRK4")
    print(f"S final: {S_rk4[-1]}")
    print(f"I final: {I_rk4[-1]}")
    print(f"R final: {R_rk4[-1]}")

    # VALORES REFERENCIA
    print("\n===== VALORES REFERENCIA RK45 =====")

    print(f"S final: {S_ref[-1]}")

    print(f"I final: {I_ref[-1]}")

    print(f"R final: {R_ref[-1]}")


    # ERROR ABSOLUTO
    error_abs_euler = abs(I_ref - I)

    error_abs_mej = abs(I_ref - I_mej)

    error_abs_rk4 = abs(I_ref - I_rk4)

    print("\n===== ERROR ABSOLUTO PROMEDIO =====")

    print(f"Euler: {error_abs_euler.mean()}")

    print(f"Euler Mejorado: {error_abs_mej.mean()}")

    print(f"RK4: {error_abs_rk4.mean()}")


    # ERROR RELATIVO
    error_rel_euler = abs((I_ref - I) / I_ref)

    error_rel_mej = abs((I_ref - I_mej) / I_ref)

    error_rel_rk4 = abs((I_ref - I_rk4) / I_ref)

    print("\n===== ERROR RELATIVO PROMEDIO =====")

    print(f"Euler: {error_rel_euler.mean()}")

    print(f"Euler Mejorado: {error_rel_mej.mean()}")

    print(f"RK4: {error_rel_rk4.mean()}")




    #Graficar resultados
        #Apoyado con IA para mejorar la visualización y comparación de ambos métodos


    # GRÁFICAS EULER

    plt.figure(figsize=(10, 6))

    plt.plot(t, S, label="Susceptibles")
    plt.plot(t, I, label="Compartiendo")
    plt.plot(t, R, label="Recuperados")

    plt.title("Modelo SIR - Euler")
    plt.xlabel("Tiempo")
    plt.ylabel("Población")

    plt.legend()
    plt.grid()


    # GRÁFICAS EULER MEJORADO

    plt.figure(figsize=(10, 6))

    plt.plot(t, S_mej, label="Susceptibles")
    plt.plot(t, I_mej, label="Compartiendo")
    plt.plot(t, R_mej, label="Recuperados")

    plt.title("Modelo SIR - Euler Mejorado")
    plt.xlabel("Tiempo")
    plt.ylabel("Población")

    plt.legend()
    plt.grid()


    # GRÁFICAS RK4

    plt.figure(figsize=(10, 6))

    plt.plot(t, S_rk4, label="Susceptibles")
    plt.plot(t, I_rk4, label="Compartiendo")
    plt.plot(t, R_rk4, label="Recuperados")

    plt.title("Modelo SIR - RK4")
    plt.xlabel("Tiempo")
    plt.ylabel("Población")

    plt.legend()
    plt.grid()

    plt.tight_layout()
    plt.show()
      

if __name__ == "__main__":
    main()