package pe.itana.monitoring.demo.graduate;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/graduates")
public class GraduateController {
	
	@Autowired
	GraduateRepository graduateRepository;
	
	Logger logger = LoggerFactory.getLogger(GraduateController.class);
	
	@GetMapping
	public List<Graduate> getAll() {
		logger.info("Obteniendo todos los graduates");
		return graduateRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Graduate findById(@PathVariable Integer id){
		logger.info("Obteniendo el graduado con id {}", id);
		Optional<Graduate> opt = graduateRepository.findById(id);
		if (opt.isEmpty()) {
			logger.error("No existe graduate con id {}", id);
			throw new RuntimeException("");
		}
		return opt.get();
	}

}
