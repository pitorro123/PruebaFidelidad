package com.example.fidelidad.modelos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Producto del catalogo ReVuelta. La marca se referencia a la tabla marcas
 * (catalogo existente del programa de fidelidad).
 */
@Entity
@Table(name = "productos")
@Getter
@Setter
@NoArgsConstructor
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String nombre;

    @Column(nullable = false, length = 60)
    private String categoria;

    @Column(nullable = false, length = 10)
    private String talla;

    @Column(nullable = false, length = 40)
    private String color;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "marca_id", nullable = false)
    private Marca marca;

    @Column(nullable = false)
    private Integer precio;

    @Column(name = "estado_prenda", nullable = false, length = 30)
    private String estadoPrenda;

    @Column(name = "disponible_para", nullable = false, length = 30)
    private String disponiblePara;

    @Column(nullable = false, length = 500)
    private String imagen;

    public Producto(String nombre, String categoria, String talla, String color,
                    Marca marca, Integer precio, String estadoPrenda,
                    String disponiblePara, String imagen) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.talla = talla;
        this.color = color;
        this.marca = marca;
        this.precio = precio;
        this.estadoPrenda = estadoPrenda;
        this.disponiblePara = disponiblePara;
        this.imagen = imagen;
    }
}