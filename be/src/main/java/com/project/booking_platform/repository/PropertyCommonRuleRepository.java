package com.project.booking_platform.repository;

import com.project.booking_platform.model.PropertyCommonRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyCommonRuleRepository extends JpaRepository<PropertyCommonRule, String> {
}
