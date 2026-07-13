package com.utp.marketplace.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.utp.marketplace.model.Usuario;
import com.utp.marketplace.repository.UsuarioRepository;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UsuarioRepository repository;

    @Override
    public void run(String... args) throws Exception {
        // Verificamos si ya existe el admin para no duplicarlo
        if (repository.findByEmail("admin@utp.edu.pe").isEmpty()) {
            Usuario admin = new Usuario();
            admin.setNombre("Administrador UTP");
            admin.setEmail("admin@utp.edu.pe");
            // Usamos el mismo encoder para que la contraseña sea válida
            admin.setPassword(new BCryptPasswordEncoder().encode("admin123"));
            admin.setRol("ROLE_ADMIN");
            
            repository.save(admin);
            System.out.println(">>> Administrador inicial creado con éxito.");
        }
    }
}