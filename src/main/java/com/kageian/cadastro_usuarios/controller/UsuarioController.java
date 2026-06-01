package com.kageian.cadastro_usuarios.controller;

import com.kageian.cadastro_usuarios.business.UsuarioService;
import com.kageian.cadastro_usuarios.infrastructure.entity.Usuario;
import com.kageian.cadastro_usuarios.infrastructure.repository.UsuarioRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuario")
@RequiredArgsConstructor
public class UsuarioController {
    private final UsuarioService service;

    @PostMapping
    public ResponseEntity<Void> salvarUsuario(@RequestBody UsuarioRequest request){
        Usuario usuario = Usuario.builder()
                .nome(request.nome())
                .email(request.email())
                .build();
        service.salvarUsuario(usuario);
        return ResponseEntity.ok().build();

    }

    @GetMapping
    public ResponseEntity<Usuario> buscarUsuarioPorEmail(@RequestParam String email){
        return ResponseEntity.ok(service.buscarUsuarioPorEmail(email));
    }
    @DeleteMapping
    public ResponseEntity<Void> deletarUsuarioPorEmail(@RequestParam String email){
        service.deletarUsuarioPorEmail(email);
        return ResponseEntity.ok().build();
    }


    @PutMapping
    public ResponseEntity<Void> atualizarUsuarioPeloId(@RequestParam Integer id,
                                                       @RequestBody Usuario usuario){

        service.atualizarUsuarioPorId(id,usuario);
        return ResponseEntity.ok().build();

    }


}
