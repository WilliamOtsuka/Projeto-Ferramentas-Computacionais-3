package br.unoeste.fipp.ativooperante2024.restcontrollers;

import br.unoeste.fipp.ativooperante2024.db.entities.Denuncia;
import br.unoeste.fipp.ativooperante2024.db.entities.Orgao;
import br.unoeste.fipp.ativooperante2024.db.entities.Tipo;
import br.unoeste.fipp.ativooperante2024.db.repositories.DenunciaRepository;
import br.unoeste.fipp.ativooperante2024.db.repositories.OrgaoRepository;
import br.unoeste.fipp.ativooperante2024.db.repositories.TipoRepository;
import br.unoeste.fipp.ativooperante2024.services.OrgaoService;
import br.unoeste.fipp.ativooperante2024.services.TipoService;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("apis/adm")
public class AdminRestController {
    @Autowired
    OrgaoService orgaoService;

    @Autowired
    TipoService tipoService;

    @Autowired
    DenunciaRepository denunciarepo;

    @Autowired
    TipoRepository tiporepo;

    @GetMapping("/teste-conexao")
    public String testeConexao()
    {
        return "conectado";
    }

    // demais apis
    @DeleteMapping("/delete-orgaos")
    public ResponseEntity<Object> excluirOrgao(@RequestParam(value="id") Long id)
    {
        if(orgaoService.delete(id))
            return new ResponseEntity<>("",HttpStatus.OK);
        else
            return new ResponseEntity<>("",HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/update-orgao")
    public ResponseEntity<Object> atualizarTipo(@RequestBody Orgao orgao) {
        Orgao updateOrgao = orgaoService.update(orgao);
        if (updateOrgao == null) {
            return new ResponseEntity<>("Orgao not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updateOrgao, HttpStatus.OK);
    }

    @PostMapping("/add-orgao")
    public ResponseEntity<Object> salvarOrgao (@RequestBody Orgao orgao)
    {
        Orgao novo;
        novo=orgaoService.save(orgao);
        return new ResponseEntity<>(novo, HttpStatus.OK);
    }

    @GetMapping("/get-orgao")
    public ResponseEntity<Object> buscarUmOrgao(@RequestParam(value="id") Long id)
    {
        Orgao orgao;
        orgao=orgaoService.getById(id);
        if(orgao==null)
            orgao=new Orgao();
        return new ResponseEntity<>(orgao,HttpStatus.OK);
    }
    @GetMapping("/get-all-orgaos")
    public ResponseEntity<Object> buscarTodosOrgaos()
    {
        return new ResponseEntity<>(orgaoService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/get-denuncia")
    public ResponseEntity<Object> buscarUmaDenuncia(@RequestParam(value="id") Long id)
    {
        return new ResponseEntity<>(denunciarepo.findById(id).
                orElse(new Denuncia()),HttpStatus.OK);
    }

    @GetMapping("/get-all-tipos")
    public ResponseEntity<Object> buscarTodosTipos()
    {
        return new ResponseEntity<>(tipoService.getAll(),HttpStatus.OK);
    }

    @PutMapping("/update-tipo")
    public ResponseEntity<Object> atualizarOrgao(@RequestBody Tipo tipo) {
        Tipo updatedTipo = tipoService.update(tipo);
        if (updatedTipo == null) {
            return new ResponseEntity<>("Tipo not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedTipo, HttpStatus.OK);
    }
    @PostMapping("/add-tipo")
    public ResponseEntity<Object> salvarTipo (@RequestBody Tipo tipo)
    {
        Tipo novo;
        novo=tipoService.save(tipo);
        return new ResponseEntity<>(novo, HttpStatus.OK);
    }

    @DeleteMapping("/delete-tipos")
    public ResponseEntity<Object> excluirTipos(@RequestParam(value="id") Long id)
    {
        if(tipoService.delete(id))
            return new ResponseEntity<>("",HttpStatus.OK);
        else
            return new ResponseEntity<>("",HttpStatus.BAD_REQUEST);
    }
}
