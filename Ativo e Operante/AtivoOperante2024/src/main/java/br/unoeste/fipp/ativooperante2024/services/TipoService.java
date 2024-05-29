package br.unoeste.fipp.ativooperante2024.services;

import br.unoeste.fipp.ativooperante2024.db.entities.Tipo;
import br.unoeste.fipp.ativooperante2024.db.repositories.TipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TipoService {
    @Autowired
    private TipoRepository repo;

    public Tipo save(Tipo tipo)
    {
        return repo.save(tipo);
    }
    public Tipo getById(Long id)
    {
        Tipo tipo = repo.findById(id).get();
        return tipo;
    }
    public List<Tipo> getAll()
    {
        return repo.findAll();
    }
    public boolean delete(Long id)
    {
        try{
            repo.deleteById(id);
        }
        catch (Exception e) {
            return false;
        }
        return true;
    }
    public Tipo update(Tipo tipo) {
        Optional<Tipo> existingTipo = repo.findById(tipo.getId());
        if (existingTipo.isPresent()) {
            return repo.save(tipo);
        } else {
            return null;
        }
    }
}
