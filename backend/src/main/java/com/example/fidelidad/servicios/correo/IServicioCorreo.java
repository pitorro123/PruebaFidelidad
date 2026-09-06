package com.example.fidelidad.servicios.correo;

public interface IServicioCorreo {

    void enviarBienvenida(String email, String nombre, String marca, boolean incluirDescuento);
}