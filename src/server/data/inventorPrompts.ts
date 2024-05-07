// eslint-disable-next-line import/prefer-default-export
export const getPromptById = (id: number): string => {
  const prompts = [
    {
      id: 0,
      text: `I am filling in a form for an Invention Report and I want you to decide if I am giving "good" or "bad" input. "Good" input is defined as input that follows the instructions while "bad" input is input that lacks important aspects. Example of bad input would be 1. The input lacks a majority of the important aspects, 2. The input is off-topic.

      Here are my specific instructions:

        Describe your general idea:
        
            1) the problem solved
            2) the invention
            3) the applications
        
      Return the below JSON inserted with your verdict about my input and 1-2 sentences of feedback:
        { 
          "verdict":[insert_Good_or_Bad_here_according_to_your_analysis_of_my_input]
          "feedback": [insert_short_feedback_about_my_input]
         }
  
      Here is the input I gave for what makes my idea unique: `,
    },
    {
      id: 1,
      text: `I am filling in a form and I want you to decide if I am giving "good" or "bad" input. "Good" input is defined as input that follows the instructions while "bad" input is input that lacks important aspects. Example of bad input would be 1. The input is too short, 2. The input doesn't contain all the parts listed in the instructions, 3. The input is off-topic.

      Here is the context:
        We are going to help you with forming an Invention Report for your idea! 

        You will receive help in steps refining the idea. We start in step 1 by outlining the key idea and continue to refine the idea, examine industrial relevance, and then potential claims
        Your helpful mentor in preparing your ideas for impact. You will receive help in steps refining the idea. We start in step 1 by outlining the key idea and continue to refine the idea, examine industrial relevance, and then potential claims.
        Please take into account that this is an AI tool for helping and sparring; it is expected to be useful, but there are limitations and human oversight is needed in interpreting the results. Enjoy the tool and good luck with your high impact idea!
        
      Here are my specific instructions:
      
      Indicate whether any part of your idea has been publicly disclosed. This includes any publications, presentations, or previous patents. Detail the extent and nature of such disclosures.
      
      Return the below JSON inserted with your verdict about my input and 1-2 sentences of feedback:
      { 
        "verdict":[insert_Good_or_Bad_here_according_to_your_analysis_of_my_input]
        "feedback": [insert_short_feedback_about_my_input]
       }

      Here is the input I gave for whether my idea has been publically disclesed:`,
    },
    {
      id: 2,
      text: `I am filling in a form and I want you to decide if I am giving "good" or "bad" input. "Good" input is defined as input that follows the instructions while "bad" input is input that lacks important aspects. Example of bad input would be 1. The input is too short, 2. The input doesn't contain all the parts listed in the instructions, 3. The input is off-topic.

      Here is the context:
        We are going to help you with forming an Invention Report for your idea! 

        You will receive help in steps refining the idea. We start in step 1 by outlining the key idea and continue to refine the idea, examine industrial relevance, and then potential claims
        Your helpful mentor in preparing your ideas for impact. You will receive help in steps refining the idea. We start in step 1 by outlining the key idea and continue to refine the idea, examine industrial relevance, and then potential claims.
        Please take into account that this is an AI tool for helping and sparring; it is expected to be useful, but there are limitations and human oversight is needed in interpreting the results. Enjoy the tool and good luck with your high impact idea!
        
      Here are my specific instructions:
        Describe the practical application of your idea. Highlight how it can be implemented in an industrial setting. Discuss its potential benefits, feasibility, and any industries or sectors where it could be particularly useful.
      
      Return the below JSON inserted with your verdict about my input and 1-2 sentences of feedback:
        {
          "verdict":[insert_Good_or_Bad_here_according_to_your_analysis_of_my_input]
          "feedback": [insert_short_feedback_about_my_input]
        }
  
        Here is the input for the practical application of my idea:`,
    },
    {
      id: 3,
      text: `You are an expert inventor employing chain of thought analysis to meticulously craft an invention report. Patent applications are scrutinized based on three pivotal criteria:
        1. Inventive Step: This criterion demands that your product or process not only solves a problem but does so through an inventive approach that is not obvious to someone with expertise in the field.
        2. Novelty: Your invention must be unique, signifying that no part of it has been previously disclosed to the public in any form, including by the inventor themselves. This requires a thorough examination of existing solutions, patents, and publicly available information to ensure that your invention stands apart. Special attention should be paid to any prior disclosures made by the inventor, assessing how such disclosures impact the invention's novelty. 
            Critically remark on already published and disclosed materials.
        3. Industrial Applicability: The invention should have practical utility in its respective industry, capable of being manufactured or used in any kind of industry.
    
        To construct a comprehensive invention report, proceed through the following enhanced steps:
        
        Step 1: Contextual Understanding
          Begin by analyzing the given context, focusing on the specific problem the invention aims to solve within its industry.
        
        Step 2: Critical Evaluation of Novelty including public dissemination by the inventor
          Conduct a detailed evaluation of the novelty aspect by identifying any existing solutions, patents, or public disclosures that resemble the invention. This includes a critical examination of any disclosures made by the inventor that could potentially jeopardize the invention's novelty.
          Consider the following:
          a. What distinguishes the invention from existing solutions, including any previous versions or disclosures by the inventor?
          b. How does it improve upon or deviate from these solutions in a way that was not previously public knowledge, taking into account any inventor's own prior disclosures?
          c. Provide examples of prior art (if any) and critically evaluate how the invention differs significantly, especially in light of any self-disclosure by the inventor.
        
        Step 3: Inventive Step and Industrial Applicability Analysis
          Examine the inventive step by explaining the unique approach or solution the invention proposes. Detail how this approach is non-obvious to experts in the field.
          Assess the industrial applicability by demonstrating how the invention can be utilized or manufactured, including its practical benefits to the industry.
        
        Step 4: Crystallization of the Invention
          Finally, synthesize your findings into a coherent invention report. This should include a clear statement of the invention following the idea topic, its background, relevance to the industry, and its unique contributions to the field`,
    },

    {
      id: 4,
      text: `You are an expert inventor using chain of thought analysis. Focus on the industrial applicability of the idea. 
        Prepare the industry applicability text for the invention report. Let’s work on this step by step way to be sure we have the right answer. 
        The revised idea is: `,
    },

    {
      id: 5,
      text: `
        You are an expert inventor using chain of thought analysis. Focus on creating patent claims for the invention report. Just report the numbered claims.
        Let’s work on this step by step way to be sure we have the right answer. 
        The revised idea is: `,
    },

    {
      id: 6,
      text: `You are an expert inventor using chain of thought analysis. Edit the following text to become an clear and precise invention report expanding on the points. Here is the input: `,
    },
  ]

  const prompt = prompts.find((p: { id: number }) => p.id === id)
  return prompt ? prompt.text : 'Prompt not found'
}
