package com.example.test.repository;

import com.example.test.model.DataPribadi;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DataPribadiRepository extends JpaRepository<DataPribadi, String> {

    DataPribadi findByNik(String nik);
}