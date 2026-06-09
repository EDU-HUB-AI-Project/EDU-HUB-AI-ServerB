package kr.hcnc.service.admin;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

// 시설 이미지 저장, soft delete
@Service("facilityImageService")
public class FacilityImageService {

	private static final Logger log = LoggerFactory.getLogger(FacilityImageService.class);

	public static final String WEB_PREFIX = "/images/facility/";
	private static final String DELETED_DIR_NAME = "_deleted";
	private static final long MAX_BYTES = 5L * 1024L * 1024L;

	private static final Set<String> ALLOWED_EXTENSIONS = new HashSet<String>(
			Arrays.asList(".png", ".jpg", ".jpeg", ".webp"));

	public String saveFacilityImage(MultipartFile file, ServletContext servletContext) throws IOException {
		if (file == null || file.isEmpty()) {
			throw new IllegalArgumentException("업로드할 이미지 파일이 없습니다.");
		}

		if (file.getSize() > MAX_BYTES) {
			throw new IllegalArgumentException("5MB 이하 이미지만 등록할 수 있습니다.");
		}

		String ext = resolveExtension(file.getOriginalFilename());
		if (!ALLOWED_EXTENSIONS.contains(ext)) {
			throw new IllegalArgumentException("png, jpg, jpeg, webp 형식만 등록할 수 있습니다.");
		}

		String uploadDir = resolveUploadDirectory(servletContext);
		File dir = new File(uploadDir);
		if (!dir.exists() && !dir.mkdirs()) {
			throw new IOException("이미지 저장 폴더를 생성할 수 없습니다.");
		}

		String fileName = UUID.randomUUID().toString().replace("-", "") + ext;
		File dest = new File(dir, fileName);
		file.transferTo(dest);

		String imagePath = WEB_PREFIX + fileName;
		log.info("Facility image saved: {}", imagePath);
		return imagePath;
	}

	// 이미지 soft delete 되면 _deleted 폴더로 이동
	public void softDeleteFacilityImage(String imagePath, ServletContext servletContext) throws IOException {
		if (imagePath == null || imagePath.trim().isEmpty()) {
			return;
		}

		String normalized = imagePath.trim();
		if (!normalized.startsWith(WEB_PREFIX) || normalized.contains("..")) {
			throw new IllegalArgumentException("삭제할 수 없는 이미지 경로입니다.");
		}

		String fileName = normalized.substring(WEB_PREFIX.length());
		if (fileName.isEmpty() || fileName.contains("/") || fileName.contains("\\")) {
			throw new IllegalArgumentException("삭제할 수 없는 이미지 경로입니다.");
		}

		File activeDir = new File(resolveUploadDirectory(servletContext));
		File source = new File(activeDir, fileName);
		if (!source.exists() || !source.isFile()) {
			log.warn("Facility image soft-delete skipped (not found): {}", normalized);
			return;
		}

		File deletedDir = new File(activeDir, DELETED_DIR_NAME);
		if (!deletedDir.exists() && !deletedDir.mkdirs()) {
			throw new IOException("이미지 보관 폴더를 생성할 수 없습니다.");
		}

		File dest = resolveDeletedDestination(deletedDir, fileName);
		if (!source.renameTo(dest)) {
			throw new IOException("이미지를 보관 폴더로 이동하지 못했습니다.");
		}

		log.info("Facility image soft-deleted: {} -> {}", normalized, dest.getAbsolutePath());
	}

	private File resolveDeletedDestination(File deletedDir, String fileName) {
		File dest = new File(deletedDir, fileName);
		if (!dest.exists()) {
			return dest;
		}

		int dot = fileName.lastIndexOf('.');
		String base = dot > 0 ? fileName.substring(0, dot) : fileName;
		String ext = dot > 0 ? fileName.substring(dot) : "";
		return new File(deletedDir, base + "_" + System.currentTimeMillis() + ext);
	}

	private String resolveUploadDirectory(ServletContext servletContext) throws IOException {
		String realPath = servletContext.getRealPath("/images/facility");
		if (realPath != null) {
			return realPath;
		}

		String webappRoot = servletContext.getRealPath("/");
		if (webappRoot == null) {
			throw new IOException("웹 애플리케이션 경로를 확인할 수 없습니다.");
		}

		File fallback = new File(webappRoot, "images/facility");
		return fallback.getAbsolutePath();
	}

	private String resolveExtension(String originalFilename) {
		if (originalFilename == null || originalFilename.trim().isEmpty()) {
			return ".png";
		}

		int dot = originalFilename.lastIndexOf('.');
		if (dot < 0) {
			return ".png";
		}

		return originalFilename.substring(dot).toLowerCase();
	}
}
