#Solver apoyado en la IA para el entendimiento del metodo RK45 y uso de solve_ivp de scipy 

from scipy.integrate import solve_ivp


def solver(S0, I0, R0, t0, tf, t, beta, gamma):

    #Sistema SIR
    def sir_system(t, y):

        S, I, R = y

        dS = -beta * S * I
        dI = beta * S * I - gamma * I
        dR = gamma * I

        return [dS, dI, dR]

    #Resolver sistema
    sol = solve_ivp(
        sir_system,
        [t0, tf],
        [S0, I0, R0],
        t_eval=t,
        method='RK45'
    )

    #Retornar soluciones
    return sol.y[0], sol.y[1], sol.y[2]