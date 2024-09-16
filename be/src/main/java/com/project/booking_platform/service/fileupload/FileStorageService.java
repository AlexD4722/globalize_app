package com.project.booking_platform.service.fileupload;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;

@Service
public class FileStorageService {
    private final Path fileLocation;

    public FileStorageService(FileStorageProperties fileStorageProperties) {
        // Try creating file location if it isn't existed
        this.fileLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileLocation);
        } catch (Exception e) {
            throw new RuntimeException("Cannot create upload directory", e);
        }
    }

    // Basic store file function
    public String storeFile(MultipartFile file, String location) {
        // Store file in file location with sub location
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        try {
            if (fileName.contains("..")) {
                throw new RuntimeException("Filename contains invalid path sequence: " + fileName);
            }
            Files.createDirectories(this.fileLocation.resolve(location));
            Path targetLocation = this.fileLocation.resolve(location).resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return targetLocation.toString();
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public String storePropertyPicture(MultipartFile file, String propertyId) {
        return storeFile(file, "property/$$id$$" + propertyId);
    }

    // Get all files in a location
    public List<String> getFileNames(String location) {
        try (var files = Files.walk(this.fileLocation.resolve(location), 1)) {
            return files
                    .filter(Files::isRegularFile)
                    .map(Path::getFileName)
                    .map(Path::toString)
                    .toList();
        } catch (IOException e) {
            throw new RuntimeException("Failed to read stored files", e);
        }
    }
}
