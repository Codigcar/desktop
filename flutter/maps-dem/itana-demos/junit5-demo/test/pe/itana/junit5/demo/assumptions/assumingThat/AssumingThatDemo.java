package pe.itana.junit5.demo.assumptions.assumingThat;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assumptions.assumingThat;

import org.junit.jupiter.api.Test;

public class AssumingThatDemo {
	
	@Test
	public void assumingThatWithBooleanCondition() {
		assumingThat("DEV".equals(System.getProperty("ENV")), () -> {
			System.out.println("Dev environment !!!");
			// perform these assertions only on the DEV server
			assertEquals(5, 3 + 2);
		});
		// below code gets executed in every environment
		System.out.println("Executed in every environment !!!");
        // perform these assertions in all environments
		assertEquals(3, 2 + 1);
	}
}
