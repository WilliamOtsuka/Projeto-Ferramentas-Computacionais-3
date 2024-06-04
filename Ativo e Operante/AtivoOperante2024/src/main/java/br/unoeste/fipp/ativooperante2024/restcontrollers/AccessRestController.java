package br.unoeste.fipp.ativooperante2024.restcontrollers;

import br.unoeste.fipp.ativooperante2024.db.entities.Usuario;
import br.unoeste.fipp.ativooperante2024.db.repositories.UsuarioRepository;
import br.unoeste.fipp.ativooperante2024.security.JWTTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("apis/security")
public class AccessRestController {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/logar")
    public ResponseEntity<Object> logar(@RequestBody Usuario usuario)
    {
        String token = "não autenticado";
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);

        Usuario user = usuarioRepository.findByEmail(usuario.getEmail());

        if(user == null) {
            return ResponseEntity.badRequest().body("Usuário não encontrado");
        }
        //acesso ao BD para verificar a existência do usuário

        //comparar a senha

        if(user.getSenha() == usuario.getSenha())
        {
            response.put("usuario", user);

            response.put("success",true);

            token=JWTTokenProvider.getToken(user.getEmail(),""+user.getNivel());
            response.put("token", token);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Object> cadastrar(@RequestBody Usuario usuario) {
        Usuario existingUser = usuarioRepository.findByEmail(usuario.getEmail());

        if (existingUser != null) {
            return ResponseEntity.badRequest().body("Usuário já existe");
        }

        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Usuário cadastrado com sucesso");
    }
}
