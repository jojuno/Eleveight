USE [SocialMediaApp132]
GO
/****** Object:  StoredProcedure [dbo].[LanguageType_SelectById]    Script Date: 9/11/2018 9:56:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Moonsoo Jo>
-- Create date: <07/02/2018>
-- Description:	<Select a language type by ID>
-- =============================================
ALTER PROCEDURE [dbo].[LanguageType_SelectById]
	-- Add the parameters for the stored procedure here
	@Id int
AS
BEGIN
/* TEST SCRIPT
DECLARE	@return_value int

EXEC	@return_value = [dbo].[LanguageType_SelectById]
		@Id = 3

SELECT	'Return Value' = @return_value
*/
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	Select [Id], [TypeName], [TypeDescription] from dbo.LanguageType
	where Id = @Id
END
