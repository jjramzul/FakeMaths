def rk4(S0, I0, R0, h, n, beta, gamma, dS_dt, dI_dt, dR_dt):

    #Vectores vacíos
    S = [0] * n
    I = [0] * n
    R = [0] * n

    #Condiciones iniciales
    S[0] = S0
    I[0] = I0
    R[0] = R0

    #Método RK4
    for i in range(n - 1):

        #k1
        k1S = dS_dt(S[i], I[i], beta)
        k1I = dI_dt(S[i], I[i], beta, gamma)
        k1R = dR_dt(I[i], gamma)

        #k2
        k2S = dS_dt(
            S[i] + (h/2) * k1S,
            I[i] + (h/2) * k1I,
            beta
        )

        k2I = dI_dt(
            S[i] + (h/2) * k1S,
            I[i] + (h/2) * k1I,
            beta,
            gamma
        )

        k2R = dR_dt(
            I[i] + (h/2) * k1I,
            gamma
        )

        #k3
        k3S = dS_dt(
            S[i] + (h/2) * k2S,
            I[i] + (h/2) * k2I,
            beta
        )

        k3I = dI_dt(
            S[i] + (h/2) * k2S,
            I[i] + (h/2) * k2I,
            beta,
            gamma
        )

        k3R = dR_dt(
            I[i] + (h/2) * k2I,
            gamma
        )

        #k4
        k4S = dS_dt(
            S[i] + h * k3S,
            I[i] + h * k3I,
            beta
        )

        k4I = dI_dt(
            S[i] + h * k3S,
            I[i] + h * k3I,
            beta,
            gamma
        )

        k4R = dR_dt(
            I[i] + h * k3I,
            gamma
        )

        #Actualizar valores
        S[i + 1] = S[i] + (h/6) * (k1S + 2*k2S + 2*k3S + k4S)

        I[i + 1] = I[i] + (h/6) * (k1I + 2*k2I + 2*k3I + k4I)

        R[i + 1] = R[i] + (h/6) * (k1R + 2*k2R + 2*k3R + k4R)

    return S, I, R