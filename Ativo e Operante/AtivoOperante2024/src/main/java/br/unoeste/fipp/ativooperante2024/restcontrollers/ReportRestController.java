package br.unoeste.fipp.ativooperante2024.restcontrollers;

import br.unoeste.fipp.ativooperante2024.db.Conexao;
import br.unoeste.fipp.ativooperante2024.db.entities.Denuncia;
import br.unoeste.fipp.ativooperante2024.db.entities.Orgao;
import br.unoeste.fipp.ativooperante2024.db.repositories.DenunciaRepository;
import br.unoeste.fipp.ativooperante2024.db.repositories.OrgaoRepository;
import br.unoeste.fipp.ativooperante2024.db.repositories.TipoRepository;
import br.unoeste.fipp.ativooperante2024.db.repositories.UsuarioRepository;
import br.unoeste.fipp.ativooperante2024.services.DenunciaService;
import br.unoeste.fipp.ativooperante2024.services.OrgaoService;
import br.unoeste.fipp.ativooperante2024.services.TipoService;
import br.unoeste.fipp.ativooperante2024.services.UsuarioService;
import net.sf.jasperreports.engine.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.ResultSet;

@RestController
@CrossOrigin
@RequestMapping("apis/reports")
public class ReportRestController {
    @Autowired
    private DenunciaRepository denunciaRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private OrgaoService orgaoService;

    @Autowired
    private TipoService tipoService;


    DenunciaService denunciaService;
    private ResourceLoader resourceLoader;

    @RequestMapping(value = "/geraRelatorio", method = RequestMethod.GET)
    public ResponseEntity<byte[]> geraRelatorio(@RequestParam(value = "relatorio") String relatorio) throws IOException {
        // path referencia o caminho relativo (realpath) para a pasta que se encontra os .jasper
        String path = resourceLoader.getResource("classpath:reports/rel_denuncias.jasper").getURI().getPath();
        byte[] contents = gerarRelatorioPDF("SELECT * FROM denuncia,orgaos,tipo WHERE denuncia.org_id = orgaos.org_id AND denuncia.tip_id = tipo.tip_id", path);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        //headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        ResponseEntity<byte[]> response = new ResponseEntity<>(contents, headers, HttpStatus.OK);
        return response;
    }

    private byte[] gerarRelatorioPDF(String sql, String relat) {
        byte[] pdf;
        try { //sql para obter os dados para o relatorio
            JasperPrint jasperprint = null;
            ResultSet rs = new Conexao().consultar(sql);
            JRResultSetDataSource jrRS = new JRResultSetDataSource(rs);
            jasperprint = JasperFillManager.fillReport(relat, null, jrRS);
            pdf = JasperExportManager.exportReportToPdf(jasperprint);

        } catch (JRException erro) {
            pdf = null;
        }
        return pdf;
    }

    @PostMapping("/gerarDenuncia")
    public ResponseEntity<Object> gerarDenuncia(@RequestParam String titulo,
                                                @RequestParam String texto,
                                                @RequestParam Long IDOrgao,
                                                @RequestParam Long IDTipo,
                                                @RequestParam int urgencia,
                                                @RequestParam Long IDusuario) {
        Denuncia denuncia = new Denuncia();
        denuncia.setTitulo(titulo);
        denuncia.setTexto(texto);
        denuncia.setUrgencia(urgencia);
        denuncia.setOrgao(orgaoService.getById(IDOrgao));


        denuncia.setTipo(tipoService.getById(IDTipo));
        denuncia.setUsuario(usuarioService.getById(IDusuario));

        System.out.println(denuncia.toString());
        try {
            denunciaRepository.save(denuncia);

            return ResponseEntity.ok("Denuncia cadastrada com sucesso");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao cadastrar denuncia: " + e.getMessage());
        }
    }
}