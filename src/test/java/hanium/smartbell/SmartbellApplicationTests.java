package hanium.smartbell;

import com.google.zxing.WriterException;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.File;
import java.io.IOException;

@SpringBootTest
class SmartbellApplicationTests {

	@Test
	@RequestMapping(value="/makeqr")
	public void makeqr() throws WriterException, IOException {
		String url = "http://naver.com";
		int width = 50;
		int height = 50;
		String file_path = "/Users/2jaebbang/Desktop"+ File.separator+"qr"+File.separator;
		String file_name = "myblog.png";
		QRUtil.makeQR(url, width, height, file_path, file_name); }

}
