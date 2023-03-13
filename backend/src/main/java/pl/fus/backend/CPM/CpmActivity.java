package pl.fus.backend.CPM;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CpmActivity {
    private String name;
    private int time;
    private List<CpmActivity> previousActivities;
    private CpmActivity posteriorActivity;
}
