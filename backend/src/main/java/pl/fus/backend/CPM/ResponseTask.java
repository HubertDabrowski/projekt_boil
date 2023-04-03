package pl.fus.backend.CPM;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseTask {
    private String name;
    private int earlyStart;
    private int earlyFinish;
    private int latestStart;
    private int latestFinish;
    private int slack;
    boolean critical;

    public ResponseTask() {
    }
}
