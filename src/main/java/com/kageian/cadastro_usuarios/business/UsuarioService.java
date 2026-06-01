package com.kageian.cadastro_usuarios.business;

import com.kageian.cadastro_usuarios.infrastructure.entity.Usuario;
import com.kageian.cadastro_usuarios.infrastructure.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;


    public UsuarioService(UsuarioRepository repository){
        this.repository = repository;
    }

    //salvar usuario

    public void salvarUsuario(Usuario usuario){
        repository.saveAndFlush(usuario);
    }
    // Buscar Por email
    public Usuario buscarUsuarioPorEmail(String email){
        return repository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("Email não encontrado")
        );
    }

    // Deletar usuario pelo email
    public void deletarUsuarioPorEmail(String email){
        repository.deleteByEmail(email);
    }


    //Atualizar o usuario pelo id selecionado kkk
    public void atualizarUsuarioPorId(Integer id, Usuario usuario){
        Usuario usuarioEntity = repository.findById(id).orElseThrow(() ->
                new RuntimeException("Usuario não encontrado"));
        Usuario usuarioAtualizado = Usuario.builder()
                .id(usuarioEntity.getId())
                .email(usuario.getEmail() != null ?
                        usuario.getEmail() :
                        usuarioEntity.getEmail())
                .nome(usuario.getNome() != null ?
                        usuario.getNome() : usuarioEntity.getNome())
                .build();
        repository.saveAndFlush(usuarioAtualizado);
    }
}
