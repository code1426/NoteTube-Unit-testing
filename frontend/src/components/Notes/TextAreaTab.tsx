import { UseFormReturn } from "react-hook-form";

import { TabsContent } from "../ui/tabs";
import { AutosizeTextarea } from "../ui/autosize-textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

interface TextAreaTabProps {
  form: UseFormReturn<{
    input: string;
  }>;
  onChange: (value: string) => void;
}

const TextAreaTab = ({ form, onChange }: TextAreaTabProps) => {
  return (
    <TabsContent
      onChange={() => onChange(form.getValues().input)}
      value="text"
      className="w-full space-y-6"
    >
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AutosizeTextarea
                    placeholder="Write your notes here..."
                    minHeight={100}
                    maxHeight={400}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    className="dark:bg-dark-foreground dark:border-dark-border"
                  />
                </FormControl>
                <FormMessage role="alert" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </TabsContent>
  );
};
export default TextAreaTab;
