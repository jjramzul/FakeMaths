def euler_mejorado(S0, I0, R0, h, n, beta, gamma, dS_dt, dI_dt, dR_dt):

    #Vectores vacíos
    S = [0] * n
    I = [0] * n
    R = [0] * n

    #Condiciones iniciales
    S[0] = S0
    I[0] = I0
    R[0] = R0

    #Método de Euler Mejorado
    for i in range(n - 1):

        #Pendientes iniciales
        m1S = dS_dt(S[i], I[i], beta)
        m1I = dI_dt(S[i], I[i], beta, gamma)
        m1R = dR_dt(I[i], gamma)

        #Valores estimados
        S_temp = S[i] + h * m1S
        I_temp = I[i] + h * m1I
        R_temp = R[i] + h * m1R

        #Pendientes corregidas
        m2S = dS_dt(S_temp, I_temp, beta)
        m2I = dI_dt(S_temp, I_temp, beta, gamma)
        m2R = dR_dt(I_temp, gamma)

        #Actualizar valores
        S[i + 1] = S[i] + (h / 2) * (m1S + m2S)
        I[i + 1] = I[i] + (h / 2) * (m1I + m2I)
        R[i + 1] = R[i] + (h / 2) * (m1R + m2R)

    return S, I, R