package pl.fus.backend.CPM;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CpmEvent {
    private String numberOfEvent;
    private int earliestStart;
    private int earliestFinish;
    private int latestStart;
    private int latestFinish;
    private int L_j;
    private List<CpmActivity> previousActivities;
    private CpmActivity posteriorActivity;

    public CpmEvent(String numberOfEvent, List<CpmActivity> previousActivities, CpmActivity posteriorActivity) {
        this.numberOfEvent = numberOfEvent;
        this.previousActivities = previousActivities;
        this.posteriorActivity = posteriorActivity;
    }
}