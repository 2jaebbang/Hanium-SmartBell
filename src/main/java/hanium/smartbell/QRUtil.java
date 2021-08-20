package hanium.smartbell;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageConfig;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;

public class QRUtil {
    /**
     * QR코드 유틸
     *
     * @param url       : QR에 작성할 URL이다
     * @param width     : QR 이미지 가로사이즈
     * @param height    : QR 이미지 세로사이즈
     * @param file_path : 생성할파일의 디렉토리경로
     * @param file_name : 생성할 파일의 파일명
     */

    public static void makeQR(String url, int width, int height, String file_path, String file_name) {
        try {
            File file = null;
            file = new File(file_path);
            if (!file.exists()) {
                file.mkdirs();
            }
            QRCodeWriter writer = new QRCodeWriter();
            url = new String(url.getBytes("UTF-8"), "ISO-8859-1");
            BitMatrix matrix = writer.encode(url, BarcodeFormat.QR_CODE, width, height);
            //QR코드 색상
            int qrColor = 0xFF2e4e96;
            MatrixToImageConfig config = new MatrixToImageConfig(qrColor, 0xFFFFFFFF);
            BufferedImage qrImage = MatrixToImageWriter.toBufferedImage(matrix, config);
            ImageIO.write(qrImage, "png", new File(file_path + file_name));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}