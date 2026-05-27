def euler(S0, I0, R0, h, n, beta, gamma, dS_dt, dI_dt, dR_dt):
    
    #Vectores vacíos
    S = [0] * n
    I = [0] * n
    R = [0] * n

    #Condiciones iniciales
    S[0] = S0
    I[0] = I0
    R[0] = R0

    #Método de Euler
    for i in range(n - 1):

        #Pendientes actuales
        dS = dS_dt(S[i], I[i], beta)
        dI = dI_dt(S[i], I[i], beta, gamma)
        dR = dR_dt(I[i], gamma)

        #Actualizar valores
        S[i + 1] = S[i] + h * dS
        I[i + 1] = I[i] + h * dI
        R[i + 1] = R[i] + h * dR

    return S, I, R