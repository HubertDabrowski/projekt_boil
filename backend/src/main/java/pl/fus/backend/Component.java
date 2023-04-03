package pl.fus.backend;

import org.springframework.web.bind.annotation.*;
import pl.fus.backend.CPM.CpmService;
import pl.fus.backend.CPM.TaskDTO;

@RestController
public class Component {
    private final CpmService cpmService;

    public Component(CpmService cpmService) {
        this.cpmService = cpmService;
    }

    @RequestMapping(value = "/cpm", method = RequestMethod.POST, consumes = "application/json")
    public void returnListOfTasks(@RequestBody TaskDTO[] tasks) {
        cpmService.calculate(tasks);
    }
}
