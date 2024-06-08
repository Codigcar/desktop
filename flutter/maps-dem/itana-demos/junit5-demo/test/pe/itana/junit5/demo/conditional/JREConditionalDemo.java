package pe.itana.junit5.demo.conditional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledOnJre;
import org.junit.jupiter.api.condition.JRE;

public class JREConditionalDemo {
	
	@Test
	@EnabledOnJre(JRE.JAVA_8)
	void onlyOnJava8() {
	    System.out.println("Only execute on Java 8");
	}

	@Test
	@EnabledOnJre({ JRE.JAVA_9, JRE.JAVA_10 })
	void onJava9Or10() {
	    System.out.println("Only execute on Java 9 or 10");
	}
}
