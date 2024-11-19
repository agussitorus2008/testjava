package com.example.test.controller;

import com.example.test.model.DataPribadi;
import com.example.test.service.DataPribadiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/data-pribadi")
public class DataPribadiController {

    @Autowired
    private DataPribadiService dataPribadiService;

    @GetMapping
    public List<DataPribadi> getAllData() {
        return dataPribadiService.getAllData();
    }

    @GetMapping("/{nik}")
    public DataPribadi getData(@PathVariable String nik) {
        System.out.println("Mencari data untuk NIK: " + nik);
        DataPribadi data = dataPribadiService.getDataByNik(nik);
        if (data == null) {
            System.out.println("Data tidak ditemukan");
        } else {
            System.out.println("Data ditemukan: " + data);
        }
        return data;
    }


    @PostMapping
    public DataPribadi addData(@RequestBody DataPribadi dataPribadi) {
        return dataPribadiService.addData(dataPribadi);
    }

    @PutMapping("/{nik}")
    public DataPribadi updateData(@PathVariable String nik, @RequestBody DataPribadi dataPribadi) {
        return dataPribadiService.updateData(nik, dataPribadi);
    }

    @DeleteMapping("/{nik}")
    public void deleteData(@PathVariable String nik) {
        dataPribadiService.deleteData(nik);
    }
}
