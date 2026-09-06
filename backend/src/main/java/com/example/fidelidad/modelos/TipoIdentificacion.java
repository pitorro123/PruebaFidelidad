package com.example.fidelidad.modelos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Catalogo de tipos de identificacion: CC, CE, NIT, Pasaporte, TI.
 */
@Entity
@Table(name = "tipos_identificacion")
@Getter
@Setter
@NoArgsConstructor
public class TipoIdentificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 10)
    private String codigo;

    @Column(nullable = false, length = 60)
    private String nombre;

    public TipoIdentificacion(String codigo, String nombre) {
        this.codigo = codigo;
        this.nombre = nombre;
    }
}