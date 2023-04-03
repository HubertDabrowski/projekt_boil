package pl.fus.backend.CPM;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {
    private int cost;
    private String name;
    private List<String> dependencies;
}
