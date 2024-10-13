package com.project.booking_platform.dto.property;

import com.project.booking_platform.model.Facility;
import com.project.booking_platform.model.PropertyCommonRule;
import com.project.booking_platform.model.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreatePropertyDTO {
    String name;
    String description;
    String address;
    String type;
    PropertyCommonRule commonRules;
    MultipartFile coverImage;
    List<MultipartFile> images;
    List<Facility> facilities;
    List<Room> rooms;
}
