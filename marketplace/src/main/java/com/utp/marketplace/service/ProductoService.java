package com.utp.marketplace.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.utp.marketplace.model.Producto;
import com.utp.marketplace.repository.ProductoRepository;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository repository;

    public Producto guardarProducto(Producto producto) {
        // Aquí podrías agregar validaciones antes de guardar
        return repository.save(producto);
    }
}