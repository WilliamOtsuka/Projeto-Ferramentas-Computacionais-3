package br.unoeste.fipp.ativooperante2024.restcontrollers;

import br.unoeste.fipp.ativooperante2024.db.entities.Denuncia;
import br.unoeste.fipp.ativooperante2024.db.entities.Feedback;
import br.unoeste.fipp.ativooperante2024.db.entities.Usuario;
import br.unoeste.fipp.ativooperante2024.db.repositories.DenunciaRepository;
import br.unoeste.fipp.ativooperante2024.db.repositories.FeedbackRepository;
import br.unoeste.fipp.ativooperante2024.db.repositories.UsuarioRepository;
import br.unoeste.fipp.ativooperante2024.security.JWTTokenProvider;
import br.unoeste.fipp.ativooperante2024.services.DenunciaService;
import br.unoeste.fipp.ativooperante2024.services.OrgaoService;
import br.unoeste.fipp.ativooperante2024.services.TipoService;
import br.unoeste.fipp.ativooperante2024.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("apis/cidadao")
public class CidadaoRestController {
    private final TipoService tipoService;

    @Autowired
    private OrgaoService orgaoService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private DenunciaService denunciaService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private DenunciaRepository denunciaRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;

    public CidadaoRestController(TipoService tipoService) {
        this.tipoService = tipoService;
    }

    @GetMapping("/teste-conexao")
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
    @GetMapping("/get-all-denuncias")
    public ResponseEntity<Object> buscarTodasDenuncias()
    {
        return new ResponseEntity<>(denunciaService.getAll(),HttpStatus.OK);
    }

    @GetMapping("/get-all-tipos")
    public ResponseEntity<Object> buscarTodosTipos()
    {
        return new ResponseEntity<>(tipoService.getAll(),HttpStatus.OK);
    }
<<<<<<< HEAD
//
//    @PostMapping("/add-denuncia")
//    public ResponseEntity<Object> salvarDenuncia(@RequestParam(value="denName") String titulo,
//                                                 @RequestParam(value="report") String texto,
//                                                 @RequestParam(value="orgao") Long idOrgao,
//                                                 @RequestParam(value="categoriaSelecionada") Long idCategoria,
//                                                 @RequestParam(value="urgencia") int urgencia,
//                                                 @RequestParam Long idUser) {
//
//        try{
//            System.out.println(titulo+" "+idOrgao+" "+idCategoria+" "+urgencia+" "+texto+" ");
//            System.out.println("teste");
//
//            Denuncia denuncia = new Denuncia();
//
//            System.out.println(orgaoService.getById(idOrgao));
//            System.out.println(usuarioService.getById(1L).getCpf());
//
//            denuncia.setTitulo(titulo);
//            denuncia.setTexto(texto);
//
//            denuncia.setUrgencia(urgencia);
//
//            denuncia.setOrgao(orgaoService.getById((idOrgao)));
//            denuncia.setData(LocalDate.now());
//            denuncia.setTipo(tipoService.getById((idCategoria)));
//
//            denuncia.setUsuario(usuarioService.getById(idUser));
//
//            try
//            {
//                denunciaService.save(denuncia);
//
//            }catch(Exception e){
//                return ResponseEntity.badRequest().body("Erro "+e.getMessage());
//            }
//
//        }catch(Exception e){
//            return ResponseEntity.badRequest().body("Erro "+e.getMessage());
//        }
//
//        return ResponseEntity.ok("INSERIDO");
//    }

    @PostMapping("/add-denuncia")
    public ResponseEntity<Object> salvarDenuncia(@RequestBody Denuncia denuncia) {

        try{
            denuncia.setData(LocalDate.now());
            denunciaService.save(denuncia);
=======

    @PostMapping("/add-denuncia")
    public ResponseEntity<Object> salvarDenuncia(@RequestParam(value="denName") String titulo,
                                                 @RequestParam(value="report") String texto,
                                                 @RequestParam(value="orgao") Long idOrgao,
                                                 @RequestParam(value="categoriaSelecionada") Long idCategoria,
                                                 @RequestParam(value="urgencia") int urgencia,
                                                 @RequestParam Long idUser) {

        try{
            System.out.println(titulo+" "+idOrgao+" "+idCategoria+" "+urgencia+" "+texto+" ");
            System.out.println("teste");

            Denuncia denuncia = new Denuncia();

            System.out.println(orgaoService.getById(idOrgao));
            System.out.println(usuarioService.getById(1L).getCpf());

            denuncia.setTitulo(titulo);
            denuncia.setTexto(texto);

            denuncia.setUrgencia(urgencia);

            denuncia.setOrgao(orgaoService.getById((idOrgao)));
            denuncia.setData(LocalDate.now());
            denuncia.setTipo(tipoService.getById((idCategoria)));

            denuncia.setUsuario(usuarioService.getById(idUser));

            try
            {
                denunciaService.save(denuncia);

            }catch(Exception e){
                return ResponseEntity.badRequest().body("Erro "+e.getMessage());
            }
>>>>>>> 47b25cd4bd9662ea4c9dd422c28e49e2b2a50b9a

        }catch(Exception e){
            return ResponseEntity.badRequest().body("Erro "+e.getMessage());
        }

        return ResponseEntity.ok("INSERIDO");
    }

<<<<<<< HEAD
=======
//    @PostMapping("/gerarDenuncia")
//    public ResponseEntity<Object> gerarDenuncia(@RequestParam String titulo,
//                                                @RequestParam String texto,
//                                                @RequestParam Long IDOrgao,
//                                                @RequestParam Long IDTipo,
//                                                @RequestParam int urgencia,
//                                                @RequestParam Long IDusuario) {
//        try {
//            Denuncia denuncia = new Denuncia();
//            denuncia.setTitulo(titulo);
//            denuncia.setTexto(texto);
//            denuncia.setOrgao(orgaoService.getById(IDOrgao));
//
//            System.out.println(denuncia.getOrgao().getId());
//            System.out.println(denuncia.getOrgao().getNome());
//
//            denuncia.setTipo(tipoService.getById(IDTipo));
//            denuncia.setUrgencia(urgencia);
//            denuncia.setData(LocalDate.now());
//            denuncia.setUsuario(usuarioService.getById(IDusuario));
//            denunciaRepository.save(denuncia);
//
//            return ResponseEntity.ok("Denúncia salva com sucesso");
//
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Erro ao salvar denúncia");
//        }
//    }

>>>>>>> 47b25cd4bd9662ea4c9dd422c28e49e2b2a50b9a
    @GetMapping("/get-denuncias-by-user")
    public ResponseEntity<Object> getDenunciasByUsuario(@RequestParam Long userId) {
        Usuario user = usuarioRepository.findById(userId).orElse(null);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        List<Denuncia> denuncias = denunciaRepository.findAllByUsuario(user);
        for (Denuncia denuncia : denuncias) {
            Feedback feedback = feedbackRepository.findByDenunciaId(denuncia.getId());
            denuncia.setFeedback(feedback);
        }

        return new ResponseEntity<>(denuncias, HttpStatus.OK);
    }
}
