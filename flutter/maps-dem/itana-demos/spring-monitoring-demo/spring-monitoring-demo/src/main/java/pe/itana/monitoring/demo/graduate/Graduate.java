package pe.itana.monitoring.demo.graduate;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Graduate {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private Integer year;
	
	private String sex;
	
	private String typeOfCourse;
	
	private Integer noOfGraduates;
	

}
