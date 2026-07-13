package com.utp.marketplace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.utp.marketplace.model.Usuario;
import com.utp.marketplace.service.UsuarioService;

@RestController
@RequestMapping("/api/auth") // Cambiamos la ruta a /api/auth
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registro")
    public String registrar(@RequestBody Usuario usuario) {
        usuarioService.registrarUsuario(usuario); // Esto encripta y guarda
        return "Usuario registrado con éxito";
    }
}