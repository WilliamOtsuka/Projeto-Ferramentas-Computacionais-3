package br.unoeste.fipp.ativooperante2024.restcontrollers;

import br.unoeste.fipp.ativooperante2024.db.Conexao;
import net.sf.jasperreports.engine.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.sql.ResultSet;

@RestController
@RequestMapping("apis/reports/")
public class ReportRestController {
    @Autowired
    private ResourceLoader resourceLoader;



    @RequestMapping(value="/geraRelatorio", method= RequestMethod.GET)
    public ResponseEntity<byte[]> geraRelatorio (@RequestParam(value="relatorio") String relatorio) throws IOException
    {
        // path referencia o caminho relativo (realpath) para a pasta que se encontra os .jasper
        String path = resourceLoader.getResource("classpath:reports/rel_denuncias.jasper").getURI().getPath();
        byte[] contents = gerarRelatorioPDF("SELECT * FROM denuncia,orgaos,tipo WHERE denuncia.org_id = orgaos.org_id AND denuncia.tip_id = tipo.tip_id", path);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        //headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        ResponseEntity<byte[]> response = new ResponseEntity<>(contents, headers, HttpStatus.OK);
        return response;
    }

    private byte[] gerarRelatorioPDF(String sql, String relat)
    {   byte[] pdf;
        try { //sql para obter os dados para o relatorio
            JasperPrint jasperprint=null;
            ResultSet rs = new Conexao().consultar(sql);
            JRResultSetDataSource jrRS = new JRResultSetDataSource(rs);
            jasperprint = JasperFillManager.fillReport(relat, null, jrRS);
            pdf= JasperExportManager.exportReportToPdf(jasperprint);

        } catch (JRException erro) {
            pdf=null;
        }
        return pdf;
    }
}
