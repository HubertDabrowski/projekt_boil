package pl.fus.backend.CPM;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/cpm")
public class CpmComponent {
    @PostMapping
    public void returnListOfTasks(@RequestBody Project list) {
        System.out.println(list);
    }
}
