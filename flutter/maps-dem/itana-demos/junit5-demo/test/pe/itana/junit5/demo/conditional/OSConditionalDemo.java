package pe.itana.junit5.demo.conditional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.DisabledOnOs;
import org.junit.jupiter.api.condition.EnabledOnOs;
import org.junit.jupiter.api.condition.OS;

public class OSConditionalDemo {
	
	@Test
	@EnabledOnOs(OS.MAC)
	void onlyOnMacOs() {
	    System.out.println("Only execute on MAC");
	}
	
	@Test
	@EnabledOnOs({ OS.LINUX, OS.MAC })
	void onLinuxOrMac() {
	    System.out.println("Only execute on Linux or MAC");
	}
	
	@Test
	@DisabledOnOs(OS.WINDOWS)
	void notOnWindows() {
		System.out.println("Not On Windows");
	}

}
