package com.utp.marketplace.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.utp.marketplace.model.Usuario;
import com.utp.marketplace.repository.UsuarioRepository;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository repository;
    
    // BCrypt es el estándar para contraseñas seguras
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public Usuario registrarUsuario(Usuario usuario) {
        // Encriptamos la contraseña antes de guardar
        usuario.setPassword(encoder.encode(usuario.getPassword()));
        
        // Asignamos rol por defecto si viene vacío
        if (usuario.getRol() == null || usuario.getRol().isEmpty()) {
            usuario.setRol("ROLE_USER");
        }
        return repository.save(usuario);
    }
}