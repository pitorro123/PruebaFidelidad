package com.example.fidelidad.servicios.correo;

import com.example.fidelidad.modelos.Cupon;

public interface IServicioCorreo {

    void enviarBienvenida(String email, String nombre, String marca, boolean incluirDescuento);

    void enviarBienvenidaConBono(String email, String nombre, String marca, Cupon bonoCumpleanos);
}