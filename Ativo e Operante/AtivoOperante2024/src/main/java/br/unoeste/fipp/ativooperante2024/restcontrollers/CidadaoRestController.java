package br.unoeste.fipp.ativooperante2024.restcontrollers;

import br.unoeste.fipp.ativooperante2024.services.OrgaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("apis/cidadao/")
public class CidadaoRestController {
    @Autowired
    private OrgaoService orgaoService;
    @GetMapping("teste-conexao")
    public String testeConexao()
    {
        return "conectado";
    }
    // demais apis
    @GetMapping("/get-all-orgaos")
    public ResponseEntity<Object> buscarTodosOrgaos()
    {
        return new ResponseEntity<>(orgaoService.getAll(), HttpStatus.OK);
    }
}
