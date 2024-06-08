package com.example.demo.usuario.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.usuario.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

}
